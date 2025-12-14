import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ChevronRight, RefreshCcw, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

// --- Data & Types ---

type QuestionType = "scale" | "boolean" | "choice";

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "On a scale of 1-10, how much do you enjoy understanding why people make decisions and what motivates them to buy?",
    type: "scale",
  },
  {
    id: 2,
    text: "On a scale of 1-10, how comfortable are you with writing persuasive text (like ads, emails, or sales pages)?",
    type: "scale",
  },
  {
    id: 3,
    text: "On a scale of 1-10, how much do you enjoy testing different versions of something to see which performs better?",
    type: "scale",
  },
  {
    id: 4,
    text: "On a scale of 1-10, how much do you enjoy solving logic puzzles or figuring out how systems work?",
    type: "scale",
  },
  {
    id: 5,
    text: "On a scale of 1-10, how patient are you with troubleshooting technical problems that require going step-by-step?",
    type: "scale",
  },
  {
    id: 6,
    text: "On a scale of 1-10, how much does it bother you when things don't look visually polished or attractive?",
    type: "scale",
  },
  {
    id: 7,
    text: "On a scale of 1-10, how comfortable are you with writing code (HTML, CSS, JavaScript)?",
    type: "scale",
  },
  {
    id: 8,
    text: "Do you have any background in art, design, or visual creativity?",
    type: "boolean",
  },
  {
    id: 9,
    text: "Which sounds more satisfying to you:",
    type: "choice",
    options: [
      { value: "A", label: "Figuring out the exact words and structure that make someone click 'buy'" },
      { value: "B", label: "Building a system that runs perfectly on autopilot" },
      { value: "C", label: "Making something look so good people immediately trust it" },
    ],
  },
  {
    id: 10,
    text: "What frustrates you more:",
    type: "choice",
    options: [
      { value: "A", label: "Bad copy that doesn't sell" },
      { value: "B", label: "Broken workflows or systems that don't work" },
      { value: "C", label: "Ugly designs or sloppy layouts" },
    ],
  },
];

type Answers = Record<number, any>;

// --- Components ---

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Check if current question is answered
  const canProceed = () => {
    const ans = answers[currentQuestion.id];
    if (currentQuestion.type === "scale") return ans !== undefined;
    if (currentQuestion.type === "boolean") return ans?.value !== undefined;
    if (currentQuestion.type === "choice") return ans !== undefined;
    return false;
  };

  if (isFinished) {
    return <ResultsView answers={answers} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />
      </div>

      <div className="w-full h-screen flex flex-col z-10">
        <Card className="flex-1 border-0 bg-transparent shadow-none rounded-none flex flex-col">
          <CardContent className="flex-1 flex flex-col p-6 md:p-12 max-w-4xl mx-auto w-full justify-center">
            
            {/* Header */}
            <div className="mb-8 flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <Link href="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ml-2 rounded-none">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground font-mono">
                  {currentStep + 1} / {questions.length}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-white/5 mb-12 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Question Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-snug">
                  {currentQuestion.text}
                </h2>

                <div className="min-h-[200px] flex flex-col justify-center">
                  {currentQuestion.type === "scale" && (
                    <ScaleInput
                      value={answers[currentQuestion.id] || 5}
                      onChange={handleAnswer}
                    />
                  )}
                  {currentQuestion.type === "boolean" && (
                    <BooleanInput
                      value={answers[currentQuestion.id]}
                      onChange={handleAnswer}
                    />
                  )}
                  {currentQuestion.type === "choice" && (
                    <ChoiceInput
                      options={currentQuestion.options!}
                      value={answers[currentQuestion.id]}
                      onChange={handleAnswer}
                    />
                  )}
                </div>

                <div className="mt-12 flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    size="lg"
                    className="w-full md:w-auto text-lg px-8 py-6 rounded-none font-bold bg-white text-black hover:bg-white/90 transition-all"
                  >
                    Next Question <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- Input Components ---

function ScaleInput({ value, onChange }: { value: number; onChange: (val: number) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-muted-foreground text-sm font-medium uppercase tracking-wider">
        <span>Not at all (1)</span>
        <span>Absolutely (10)</span>
      </div>
      <Slider
        value={[value]}
        min={1}
        max={10}
        step={1}
        onValueChange={(vals) => onChange(vals[0])}
        className="py-4"
      />
      <div className="text-center">
        <span className="text-4xl font-bold text-primary">{value}</span>
      </div>
    </div>
  );
}

function BooleanInput({ value, onChange }: { value: any; onChange: (val: any) => void }) {
  // value structure: { value: boolean, explanation: string }
  const selected = value?.value;
  const explanation = value?.explanation || "";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onChange({ ...value, value: true })}
          className={`p-6 rounded-none border-2 transition-all duration-200 ${
            selected === true
              ? "border-primary bg-primary/10 text-primary"
              : "border-white/10 hover:border-white/20 hover:bg-white/5"
          }`}
        >
          <span className="text-xl font-bold">Yes</span>
        </button>
        <button
          onClick={() => onChange({ ...value, value: false })}
          className={`p-6 rounded-none border-2 transition-all duration-200 ${
            selected === false
              ? "border-primary bg-primary/10 text-primary"
              : "border-white/10 hover:border-white/20 hover:bg-white/5"
          }`}
        >
          <span className="text-xl font-bold">No</span>
        </button>
      </div>
      
      <div className="space-y-2">
        <Label className="text-muted-foreground">Briefly explain (optional)</Label>
        <Textarea
          value={explanation}
          onChange={(e) => onChange({ ...value, value: selected, explanation: e.target.value })}
          placeholder="I took a graphic design course in college..."
          className="bg-black/20 border-white/10 focus:border-primary min-h-[100px] rounded-none"
        />
      </div>
    </div>
  );
}

function ChoiceInput({ options, value, onChange }: { options: { value: string; label: string }[]; value: string; onChange: (val: string) => void }) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-4">
      {options.map((opt) => (
        <div key={opt.value}>
          <RadioGroupItem value={opt.value} id={opt.value} className="peer sr-only" />
          <Label
            htmlFor={opt.value}
            className={`flex items-center p-6 rounded-none border-2 cursor-pointer transition-all duration-200 ${
              value === opt.value
                ? "border-primary bg-primary/10 text-primary"
                : "border-white/10 hover:border-white/20 hover:bg-white/5"
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0 ${
               value === opt.value ? "border-primary" : "border-muted-foreground"
            }`}>
              {value === opt.value && <div className="w-3 h-3 rounded-full bg-primary" />}
            </div>
            <span className="text-lg font-medium leading-normal">{opt.label}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

// --- Results Component ---

function ResultsView({ answers }: { answers: Answers }) {
  // Calculate Scores
  
  // Funnels: Q1, Q2, Q3 (1-10) + Q9=A + Q10=A
  const funnelsRaw = 
    (answers[1] || 0) + 
    (answers[2] || 0) + 
    (answers[3] || 0); // Max 30
  
  const funnelsBonus = 
    (answers[9] === "A" ? 10 : 0) + 
    (answers[10] === "A" ? 10 : 0);
    
  const funnelsScore = ((funnelsRaw + funnelsBonus) / 50) * 100;

  // Automation: Q4, Q5 (1-10). Note: Prompt emphasizes these two. 
  // Let's weight them x1.5 to match the 3-question scale of others? 
  // Or just sum them (max 20) + bonuses (20) = 40 total.
  const automationRaw = 
    (answers[4] || 0) + 
    (answers[5] || 0); // Max 20
    
  const automationBonus = 
    (answers[9] === "B" ? 10 : 0) + 
    (answers[10] === "B" ? 10 : 0);
  
  const automationScore = ((automationRaw + automationBonus) / 40) * 100;

  // Design: Q6, Q7 (1-10) + Q8(Bool) + Bonuses
  const designRaw = 
    (answers[6] || 0) + 
    (answers[7] || 0); // Max 20
    
  const designBonus = 
    (answers[8]?.value === true ? 10 : 0) + 
    (answers[9] === "C" ? 10 : 0) + 
    (answers[10] === "C" ? 10 : 0);

  const designScore = ((designRaw + designBonus) / 50) * 100;

  const scores = [
    { 
        id: "funnels", 
        name: "Funnels + Conversion Architecture", 
        score: funnelsScore,
        desc: "You understand human psychology and how to persuade action.",
        skills: ["Copywriting", "CRO (Conversion Rate Optimization)", "A/B Testing", "Offer Creation", "User Psychology"],
        role: "You're the strategist who architects the path from visitor to customer.",
        color: "text-purple-400"
    },
    { 
        id: "automation", 
        name: "Automation + Workflows", 
        score: automationScore,
        desc: "You love logic, puzzles, and making systems run flawlessly.",
        skills: ["Workflow Logic", "API Integrations", "Troubleshooting", "Data Management", "System Architecture"],
        role: "You're the engineer who ensures the machine runs smoothly without manual input.",
        color: "text-blue-400"
    },
    { 
        id: "design", 
        name: "Design + Custom Widgets", 
        score: designScore,
        desc: "You have an eye for beauty and the technical skills to build it.",
        skills: ["UI/UX Design", "CSS/HTML", "Visual Branding", "Interactive Elements", "Frontend Development"],
        role: "You're the artist who builds trust through professional, polished visuals.",
        color: "text-pink-400"
    },
  ];

  // Sort by score
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const primary = sortedScores[0];
  const backup = sortedScores[1];

  return (
    <div className="min-h-screen bg-background py-12 px-4 relative overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
      
      <div className="container mx-auto max-w-6xl relative z-10 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-3 rounded-full bg-green-500/10 text-green-400 mb-4 border border-green-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Results Are In</h1>
          <p className="text-xl text-muted-foreground">Here is your ideal role in the team.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Primary Result Card - Spans 2 cols on desktop */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glass-panel p-8 md:p-10 rounded-none h-full border-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-32 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all" />
              
              <div className="relative z-10">
                <span className="text-sm font-bold tracking-widest text-primary uppercase mb-2 block">Top Recommendation</span>
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${primary.color}`}>{primary.name}</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-2">Why this fits you:</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">{primary.desc}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Skills to build:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {primary.skills.map((skill) => (
                      <li key={skill} className="flex items-center text-sm text-gray-300 bg-black/20 px-3 py-2 rounded-none border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-white/5 rounded-none border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-1">Team Contribution</h3>
                  <p className="text-sm text-muted-foreground">{primary.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Backup Result Card */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="glass-panel p-6 rounded-none h-full flex flex-col justify-between border-white/5">
              <div>
                <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-4 block">Backup Option</span>
                <h3 className="text-xl font-bold text-white mb-4">{backup.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{backup.desc}</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full mb-2">
                   <div className="h-full bg-white/30 rounded-full" style={{ width: `${backup.score}%` }} />
                </div>
                <span className="text-xs text-muted-foreground">{Math.round(backup.score)}% Match</span>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5">
                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 rounded-none" onClick={() => window.location.reload()}>
                  <RefreshCcw className="w-4 h-4 mr-2" /> Retake Quiz
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
