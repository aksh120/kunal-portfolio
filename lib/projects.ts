export type Project = {
  slug: string;
  title: string;
  tag: string;
  image: string;
  logo?: string;
  brand?: string;
  pdf?: string;
  details?: {
    year?: string;
    services?: string[];
    images?: string[];
    description?: string;
  };
};

export type PersonalProject = {
  slug: string;
  title: string;
  tag: string;
  image: string;
  pdf?: string;
  details?: {
    year?: string;
    services?: string[];
    images?: string[];
    description?: string;
  };
};

export const professionalProjects: Project[] = [
  {
    slug: 'tommy-hilfiger',
    title: 'TOMMY HILFIGER',
    tag: 'Travel Gear',
    image: 'https://i.ibb.co/xSVdk6Ss/THSS25.jpg',
    brand: 'Tommy Hilfiger',
    pdf: '/THSS25 Luggage.pdf',
    details: {
      year: '2025',
      images: [
        'https://i.ibb.co/xSVdk6Ss/THSS25.jpg'
      ],
      description: 'Selected work for the travel gear line.'
    }
  },
  {
    slug: 'united-colors-of-benetton',
    title: 'UNITED COLORS OF BENETTON',
    tag: 'Travel Gear',
    image: 'https://i.ibb.co/RkpP88XZ/UCB.png',
    brand: 'UCB',
    details: {
      year: '2025'
    }
  },
  {
    slug: 'us-polo-assn',
    title: 'U.S. POLO ASSN.',
    tag: 'Travel Gear',
    image: 'https://i.ibb.co/1f8gkShk/USPA.png',
    brand: 'USPA',
    details: {
      year: '2024'
    }
  },
  {
    slug: 'superdry',
    title: 'Superdry',
    tag: 'Travel Gear',
    image: 'https://i.ibb.co/ZzH1cBDS/Superdry.png',
    brand: 'Superdry',
    details: {
      year: '2025'
    }
  }
];

export function getProfessionalProjects(): Project[] {
  return professionalProjects;
}

export function getInternshipProjects(): Project[] {
  return internshipProjects;
}

export function findProject(
  kind: 'works' | 'internship',
  slug: string
): Project | undefined {
  const list = kind === 'works' ? professionalProjects : internshipProjects;
  return list.find((p) => p.slug === slug);
}

export const internshipProjects: Project[] = [
  {
    slug: 'project-1',
    title: 'Project 1',
    tag: 'Furniture Design',
    image: 'https://i.ibb.co/8gj9wRcx/P1.jpg',
    brand: 'Kunal Kamde',
    pdf: '/P1.pdf',
    details: {
      year: '2022'
    }
  },
  {
    slug: 'project-2',
    title: 'Project 2',
    tag: 'FURNITURE DESIGN',
    image: 'https://i.ibb.co/zV8GLDLc/p2.jpg',
    brand: 'Kunal Kamde',
    pdf: '/P2.pdf',
    details: {
      year: '2022'
    }
  }
];

export const personalProjects: PersonalProject[] = [
  {
    slug: 'pending',
    title: 'PENDING',
    tag: 'Product Design',
    image: 'https://i.ibb.co/FLqxFFQh/Beatcubes.jpg',
  },
  {
    slug: 'beatcubes',
    title: 'Beatcubes',
    tag: 'Product Design',
    image: 'https://i.ibb.co/FLqxFFQh/Beatcubes.jpg',
    pdf: '/Beatcubes.pdf',
    details: {
      year: '2023',
      images: ['https://i.ibb.co/FLqxFFQh/Beatcubes.jpg'],
      description: 'Selected explorations and prototypes.'
    }
  },
  {
    slug: 'smart-waste-management-system',
    title: 'Smart Waste Management System',
    tag: 'Product Design',
    image: 'https://i.ibb.co/8gws2TB4/Smart-waste-management-system.jpg',
    pdf: '/Smart waste management system.pdf',
    details: {
      year: '2022'
    }
  },
  {
    slug: 'redluffy',
    title: 'Redluffy',
    tag: 'Transportation Design',
    image: 'https://i.ibb.co/spbVnF3L/Redluffy.jpg',
    pdf: '/Redluffy.pdf',
    details: {
      year: '2022'
    }
  },
];

export function getPersonalProjects(): PersonalProject[] {
  return personalProjects;
}

export function findPersonalProject(slug: string): PersonalProject | undefined {
  return personalProjects.find((p) => p.slug === slug);
}
