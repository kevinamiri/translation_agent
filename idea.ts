interface Agent {
    name: string;
    role: 'Action' | 'Critique' | 'Judgment';
    act: (input: string) => string;
  }
  
  class TransAgents {
    private actionAgent: Agent;
    private critiqueAgent: Agent;
    private judgmentAgent: Agent;
    private maxIterations: number;
  
    constructor(actionAgent: Agent, critiqueAgent: Agent, judgmentAgent: Agent, maxIterations: number = 3) {
      this.actionAgent = actionAgent;
      this.critiqueAgent = critiqueAgent;
      this.judgmentAgent = judgmentAgent;
      this.maxIterations = maxIterations;
    }
  
    translate(sourceText: string): string {
      console.log(`Starting translation process for: "${sourceText}"`);
      let translation = '';
      let iteration = 0;
  
      while (iteration < this.maxIterations) {
        iteration++;
        console.log(`\nIteration ${iteration}:`);
  
        // Action agent generates translation
        translation = this.actionAgent.act(sourceText);
        console.log(`${this.actionAgent.name} (${this.actionAgent.role}): "${translation}"`);
  
        // Critique agent reviews translation
        const critique = this.critiqueAgent.act(translation);
        console.log(`${this.critiqueAgent.name} (${this.critiqueAgent.role}): "${critique}"`);
  
        // Judgment agent evaluates translation
        const judgment = this.judgmentAgent.act(translation);
        console.log(`${this.judgmentAgent.name} (${this.judgmentAgent.role}): "${judgment}"`);
  
        if (judgment.toLowerCase().includes('approved')) {
          console.log(`\nTranslation approved after ${iteration} iteration(s).`);
          return translation;
        }
      }
  
      console.log(`\nReached maximum iterations (${this.maxIterations}). Returning last translation.`);
      return translation;
    }
  }
  
  // Example usage
  const actionAgent: Agent = {
    name: 'Alice',
    role: 'Action',
    act: (input: string) => `Translated: ${input.toUpperCase()}`,
  };
  
  const critiqueAgent: Agent = {
    name: 'Bob',
    role: 'Critique',
    act: (input: string) => input.includes('HELLO') ? 'Good translation' : 'Needs improvement',
  };
  
  const judgmentAgent: Agent = {
    name: 'Charlie',
    role: 'Judgment',
    act: (input: string) => input.length > 15 ? 'Approved' : 'Needs revision',
  };
  
  const transAgents = new TransAgents(actionAgent, critiqueAgent, judgmentAgent);
  const result = transAgents.translate('Hello, world!');
  console.log(`\nFinal translation: "${result}"`);
