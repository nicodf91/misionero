import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { WizardState, Product } from '../types';
import { PRODUCTS } from '../constants';
import { useCart } from '../App';
import { Link } from 'react-router-dom';

const Wizard: React.FC = () => {
  const [state, setState] = useState<WizardState>({
    step: 0,
    answers: {}
  });
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const { addToCart } = useCart();

  const handleAnswer = (key: keyof WizardState['answers'], value: any) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
      step: prev.step + 1
    }));
  };

  const calculateRecommendation = () => {
    // Simple logic engine to match answers to products
    const { experience, priority, forWho } = state.answers;
    
    let scores = PRODUCTS.map(p => ({ product: p, score: 0 }));

    scores.forEach(item => {
      // Logic for Beginner
      if (experience === 'beginner' && item.product.tags.includes('beginner_friendly')) item.score += 5;
      
      // Logic for Expert/Daily
      if ((experience === 'daily' || experience === 'expert') && item.product.tags.includes('daily')) item.score += 3;
      if (experience === 'expert' && item.product.tags.includes('expert')) item.score += 5;

      // Logic for Gift
      if (forWho === 'gift' && item.product.tags.includes('gift_ready')) item.score += 5;
      if (forWho === 'gift' && item.product.category === 'pack') item.score += 3; // Packs make good gifts

      // Logic for Priority
      if (priority === 'price' && item.product.tags.includes('price')) item.score += 5;
      if (priority === 'design' && item.product.tags.includes('premium')) item.score += 4;
      if (priority === 'durability' && item.product.tags.includes('daily')) item.score += 4;
    });

    // Sort by score
    scores.sort((a, b) => b.score - a.score);
    
    // Pick top results (ensure at least one pack is shown if score is decent)
    setRecommendations(scores.slice(0, 2).map(s => s.product));
    setState(prev => ({ ...prev, step: 100 })); // 100 is result step
  };

  // Skip logic if we are at last question
  const isLastQuestion = state.step === 2; // 0, 1, 2 (3 questions)
  
  const nextStep = () => {
    if (isLastQuestion) calculateRecommendation();
  };

  // --- Render Steps ---

  const renderQuestion = () => {
    switch (state.step) {
      case 0:
        return (
          <QuestionStep 
            question="¿Para quién es este mate?"
            options={[
              { label: "Es para mí", value: 'me', desc: "Quiero renovar mi equipo o empezar." },
              { label: "Es para un regalo", value: 'gift', desc: "Quiero sorprender a alguien especial." }
            ]}
            onSelect={(val) => handleAnswer('forWho', val)}
          />
        );
      case 1:
        return (
          <QuestionStep 
            question={state.answers.forWho === 'gift' ? "¿Qué tanta experiencia tiene la persona?" : "¿Cuál es tu nivel de experiencia?"}
            options={[
              { label: "Principiante / Curioso", value: 'beginner', desc: "Recién arranco o tomo muy poco." },
              { label: "Matero Diario", value: 'daily', desc: "El mate es parte de mi rutina." },
              { label: "Sommelier / Exigente", value: 'expert', desc: "Busco detalles técnicos y sabor puro." }
            ]}
            onSelect={(val) => handleAnswer('experience', val)}
          />
        );
      case 2:
        return (
          <QuestionStep 
            question="¿Qué priorizás hoy?"
            options={[
              { label: "Practicidad y Precio", value: 'price', desc: "Bueno, bonito y barato." },
              { label: "Diseño y Estética", value: 'design', desc: "Que luzca increíble." },
              { label: "Durabilidad", value: 'durability', desc: "Que me acompañe toda la vida." }
            ]}
            onSelect={(val) => {
              handleAnswer('priority', val);
              // Trigger calc immediately after this state update requires useEffect or direct call
              // For simplicity, we'll manually set state and trigger calc in a timeout or different flow
              setTimeout(calculateRecommendation, 50); 
            }}
          />
        );
      default:
        return null;
    }
  };

  if (state.step === 100) {
    return <ResultsScreen recommendations={recommendations} />;
  }

  return (
    <div className="min-h-screen bg-misionero-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-between text-xs font-bold tracking-widest text-misionero-600">
          <span>PASO {state.step + 1} DE 3</span>
          <button onClick={() => window.history.back()} className="hover:text-misionero-900">VOLVER</button>
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-misionero-900/5 fade-in border border-misionero-100">
          {renderQuestion()}
        </div>
      </div>
    </div>
  );
};

const QuestionStep: React.FC<{ 
  question: string; 
  options: { label: string, value: string, desc: string }[];
  onSelect: (val: string) => void; 
}> = ({ question, options, onSelect }) => (
  <div className="fade-in">
    <h2 className="font-serif text-2xl md:text-3xl text-misionero-900 mb-8 text-center">{question}</h2>
    <div className="grid gap-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className="group text-left p-6 border-2 border-misionero-100 rounded-xl hover:border-misionero-900 hover:bg-misionero-50 transition-all duration-200 flex flex-col"
        >
          <span className="font-bold text-lg text-misionero-900 group-hover:text-misionero-900">{opt.label}</span>
          <span className="text-sm text-misionero-500">{opt.desc}</span>
        </button>
      ))}
    </div>
  </div>
);

const ResultsScreen: React.FC<{ recommendations: Product[] }> = ({ recommendations }) => {
  const { addToCart } = useCart();
  const mainRec = recommendations[0];
  const secondaryRec = recommendations[1];

  return (
    <div className="min-h-screen py-12 md:py-20 px-4 bg-misionero-50 fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-misionero-600 font-bold tracking-widest text-sm mb-2 block">TU PERFIL MATERO</span>
          <h2 className="font-serif text-3xl md:text-4xl text-misionero-900">Tenemos la opción perfecta para vos</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-misionero-200">
             <div className="md:w-1/2 h-64 md:h-auto relative">
               <img src={mainRec.image} alt={mainRec.name} className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute top-4 left-4 bg-misionero-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                 MEJOR ELECCIÓN
               </div>
             </div>
             <div className="p-8 md:w-1/2 flex flex-col justify-center">
               <h3 className="font-serif text-2xl text-misionero-900 mb-2">{mainRec.name}</h3>
               <p className="text-misionero-600 mb-6 text-sm leading-relaxed">{mainRec.description}</p>
               
               <div className="mb-6 space-y-2">
                 {mainRec.features.slice(0, 3).map((f, i) => (
                   <div key={i} className="flex items-center gap-2 text-sm text-misionero-700">
                     <CheckCircle size={14} className="text-accent-500" /> {f}
                   </div>
                 ))}
               </div>

               <div className="flex items-baseline gap-2 mb-6">
                  {mainRec.discountPrice ? (
                    <>
                      <span className="text-2xl font-bold text-misionero-900">${mainRec.discountPrice.toLocaleString()}</span>
                      <span className="text-sm line-through text-misionero-400">${mainRec.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-misionero-900">${mainRec.price.toLocaleString()}</span>
                  )}
               </div>

               <button 
                onClick={() => addToCart(mainRec)}
                className="w-full bg-misionero-900 text-white py-4 rounded-lg font-bold hover:bg-misionero-800 transition-colors mb-3"
               >
                 Elegir esta opción
               </button>
               <Link to={`/product/${mainRec.id}`} className="block text-center text-sm text-misionero-500 hover:text-misionero-900">
                 Ver detalles completos
               </Link>
             </div>
          </div>

          {/* Secondary Card */}
          {secondaryRec && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-misionero-100">
              <div className="text-xs font-bold text-misionero-400 uppercase mb-4 tracking-wider">Alternativa</div>
              <img src={secondaryRec.image} alt={secondaryRec.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h4 className="font-serif text-lg text-misionero-900 mb-1">{secondaryRec.name}</h4>
              <p className="text-xs text-misionero-500 mb-4">{secondaryRec.subtitle}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-misionero-900">${(secondaryRec.discountPrice || secondaryRec.price).toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(secondaryRec)}
                  className="text-misionero-900 text-sm font-bold hover:underline"
                >
                  Agregar
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
           <Link to="/builder" className="inline-flex items-center gap-2 text-misionero-600 hover:text-misionero-900 transition-colors">
             Preferiría armar mi propio set paso a paso <ArrowRight size={16}/>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Wizard;