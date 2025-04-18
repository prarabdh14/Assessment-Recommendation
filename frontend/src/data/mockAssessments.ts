import { Assessment } from '../types';

export const mockAssessments: Assessment[] = [
  {
    id: "1",
    title: "Cognitive Ability Assessment",
    description: "Measures a candidate's ability to process information, solve problems, and learn new skills.",
    category: "Cognitive",
    duration: "35 minutes",
    skills: ["Problem solving", "Critical thinking", "Numerical reasoning", "Verbal reasoning"],
    benefits: [
      "Predict job performance and learning ability",
      "Identify candidates who can handle complex tasks",
      "Reduce training time and costs"
    ],
    suitableFor: ["Management positions", "Technical roles", "Analysts", "Developers"],
    imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "2",
    title: "Personality Profile Analysis",
    description: "Evaluates a candidate's behavior patterns, preferences, and working style to determine cultural fit.",
    category: "Personality",
    duration: "25 minutes",
    skills: ["Communication style", "Team collaboration", "Work preferences", "Motivation factors"],
    benefits: [
      "Improve team dynamics and collaboration",
      "Reduce turnover by ensuring cultural fit",
      "Identify leadership potential"
    ],
    suitableFor: ["Team leaders", "Customer-facing roles", "Collaborative environments", "Service industry"],
    imageUrl: "https://images.pexels.com/photos/3153207/pexels-photo-3153207.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "3",
    title: "Leadership Potential Assessment",
    description: "Identifies candidates with the capacity to lead teams, make strategic decisions, and drive results.",
    category: "Leadership",
    duration: "45 minutes",
    skills: ["Decision making", "Team motivation", "Strategic thinking", "People management"],
    benefits: [
      "Identify future leaders within your organization",
      "Reduce leadership training costs",
      "Improve team performance through better leadership"
    ],
    suitableFor: ["Managerial roles", "Team leaders", "Project managers", "Executive positions"],
    imageUrl: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "4",
    title: "Sales Aptitude Test",
    description: "Evaluates a candidate's natural sales abilities, persuasion skills, and resilience.",
    category: "Sales",
    duration: "30 minutes",
    skills: ["Persuasion", "Relationship building", "Resilience", "Goal orientation"],
    benefits: [
      "Increase sales team performance",
      "Reduce sales staff turnover",
      "Identify high-potential sales candidates"
    ],
    suitableFor: ["Sales representatives", "Account managers", "Business development", "Retail positions"],
    imageUrl: "https://images.pexels.com/photos/1056553/pexels-photo-1056553.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "5",
    title: "Technical Aptitude Assessment",
    description: "Measures a candidate's technical reasoning abilities and capacity to learn new technologies.",
    category: "Technical",
    duration: "40 minutes",
    skills: ["Technical reasoning", "Logical thinking", "Pattern recognition", "Learning aptitude"],
    benefits: [
      "Identify technically adept candidates",
      "Reduce technical training time",
      "Improve innovation and problem-solving"
    ],
    suitableFor: ["IT professionals", "Engineers", "Technical support", "Product developers"],
    imageUrl: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "6",
    title: "Customer Service Assessment",
    description: "Evaluates a candidate's customer orientation, empathy, and problem-solving abilities.",
    category: "Customer Service",
    duration: "25 minutes",
    skills: ["Empathy", "Communication", "Problem-solving", "Patience"],
    benefits: [
      "Improve customer satisfaction scores",
      "Reduce customer service turnover",
      "Identify naturally service-oriented candidates"
    ],
    suitableFor: ["Call center agents", "Support specialists", "Service desk staff", "Retail associates"],
    imageUrl: "https://images.pexels.com/photos/4101142/pexels-photo-4101142.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "7",
    title: "Project Management Aptitude",
    description: "Assesses a candidate's ability to plan, execute, and deliver projects efficiently.",
    category: "Project Management",
    duration: "35 minutes",
    skills: ["Planning", "Organization", "Risk management", "Team coordination"],
    benefits: [
      "Improve project completion rates",
      "Reduce budget overruns",
      "Enhance team productivity"
    ],
    suitableFor: ["Project managers", "Program coordinators", "Team leads", "Operations managers"],
    imageUrl: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "8",
    title: "Emotional Intelligence Assessment",
    description: "Measures a candidate's ability to understand and manage emotions in themselves and others.",
    category: "Emotional Intelligence",
    duration: "30 minutes",
    skills: ["Self-awareness", "Empathy", "Relationship management", "Emotional regulation"],
    benefits: [
      "Improve team communication and collaboration",
      "Reduce workplace conflicts",
      "Enhance leadership effectiveness"
    ],
    suitableFor: ["People managers", "HR professionals", "Team leaders", "Customer-facing roles"],
    imageUrl: "https://images.pexels.com/photos/3194518/pexels-photo-3194518.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "9",
    title: "Data Analysis Skills Assessment",
    description: "Evaluates a candidate's ability to interpret data, identify patterns, and derive insights.",
    category: "Data Analysis",
    duration: "45 minutes",
    skills: ["Data interpretation", "Statistical analysis", "Critical thinking", "Attention to detail"],
    benefits: [
      "Identify analytically strong candidates",
      "Improve business decision making",
      "Enhance reporting and insights quality"
    ],
    suitableFor: ["Data analysts", "Business intelligence roles", "Research positions", "Financial analysts"],
    imageUrl: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "10",
    title: "Workplace Safety Assessment",
    description: "Assesses a candidate's safety awareness, risk perception, and compliance orientation.",
    category: "Safety",
    duration: "20 minutes",
    skills: ["Risk awareness", "Rule compliance", "Attention to detail", "Responsibility"],
    benefits: [
      "Reduce workplace accidents and incidents",
      "Lower insurance costs",
      "Create a safer work environment"
    ],
    suitableFor: ["Industrial workers", "Construction personnel", "Healthcare staff", "Transportation roles"],
    imageUrl: "https://images.pexels.com/photos/8942941/pexels-photo-8942941.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "11",
    title: "Communication Skills Assessment",
    description: "Evaluates a candidate's verbal and written communication abilities, listening skills, and clarity of expression.",
    category: "Communication",
    duration: "30 minutes",
    skills: ["Verbal expression", "Written communication", "Active listening", "Presentation skills"],
    benefits: [
      "Improve team collaboration and understanding",
      "Enhance client and stakeholder relationships",
      "Reduce misunderstandings and errors"
    ],
    suitableFor: ["Corporate communications", "Content creators", "Team managers", "Client relations"],
    imageUrl: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "12",
    title: "Innovation Potential Assessment",
    description: "Measures a candidate's creative thinking, idea generation, and innovation approach.",
    category: "Innovation",
    duration: "35 minutes",
    skills: ["Creative thinking", "Problem-solving", "Adaptability", "Future orientation"],
    benefits: [
      "Drive business innovation and growth",
      "Identify employees who can lead change",
      "Improve product and service development"
    ],
    suitableFor: ["Product designers", "R&D professionals", "Marketing specialists", "Strategy roles"],
    imageUrl: "https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "13",
    title: "Time Management Assessment",
    description: "Evaluates a candidate's ability to prioritize tasks, meet deadlines, and work efficiently.",
    category: "Productivity",
    duration: "25 minutes",
    skills: ["Prioritization", "Organization", "Focus", "Efficiency"],
    benefits: [
      "Improve team productivity and output",
      "Reduce missed deadlines",
      "Enhance work quality through better planning"
    ],
    suitableFor: ["Administrative roles", "Project coordinators", "Executive assistants", "Freelancers"],
    imageUrl: "https://images.pexels.com/photos/615798/pexels-photo-615798.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "14",
    title: "Digital Literacy Assessment",
    description: "Assesses a candidate's proficiency with digital tools, online platforms, and technology adaptation.",
    category: "Digital Skills",
    duration: "30 minutes",
    skills: ["Computer proficiency", "Software adaptation", "Digital problem-solving", "Online collaboration"],
    benefits: [
      "Reduce technology training costs",
      "Identify digitally capable employees",
      "Improve adoption of new systems"
    ],
    suitableFor: ["Office workers", "Remote employees", "Digital marketers", "Customer support"],
    imageUrl: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: "15",
    title: "Team Collaboration Assessment",
    description: "Evaluates how effectively a candidate works in team environments, contributes, and resolves conflicts.",
    category: "Teamwork",
    duration: "30 minutes",
    skills: ["Collaboration", "Conflict resolution", "Adaptability", "Communication"],
    benefits: [
      "Build more effective and harmonious teams",
      "Reduce workplace tensions",
      "Improve project outcomes through better teamwork"
    ],
    suitableFor: ["Team members", "Cross-functional roles", "Project teams", "Collaborative environments"],
    imageUrl: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];