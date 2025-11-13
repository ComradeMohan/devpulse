import {
  Award,
  BrainCircuit,
  Heart,
  Rocket,
  Star,
  GitMerge,
  Box,
  type LucideIcon,
} from 'lucide-react';

export type Achievement = {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
};

export const achievements: Achievement[] = [
  {
    id: 'arctic-code-vault',
    name: 'Arctic Code Vault Contributor',
    description: 'Contributed code to a repository in the 2020 GitHub Archive Program.',
    Icon: Box,
  },
  {
    id: 'pull-shark',
    name: 'Pull Shark',
    description: 'Opened 2 pull requests that were merged.',
    Icon: GitMerge,
  },
  {
    id: 'yolo',
    name: 'YOLO',
    description: 'Merged a pull request without a review.',
    Icon: Rocket,
  },
  {
    id: 'galaxy-brain',
    name: 'Galaxy Brain',
    description: 'Answered a discussion that was marked as the answer.',
    Icon: BrainCircuit,
  },
  {
    id: 'starstruck',
    name: 'Starstruck',
    description: 'Created a repository that has 16 stars.',
    Icon: Star,
  },
  {
    id: 'heart-on-your-sleeve',
    name: 'Heart On Your Sleeve',
    description: 'Reacted to something on GitHub with a ❤️ emoji.',
    Icon: Heart,
  },
  {
    id: 'developer-program-member',
    name: 'Developer Program Member',
    description: 'Joined the GitHub Developer Program.',
    Icon: Award,
  },
];
