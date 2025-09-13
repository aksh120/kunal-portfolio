import { notFound } from 'next/navigation';
import type { Route } from 'next';
import ProjectDetailView from '@/components/pages/ProjectDetailView';
import { findProject, professionalProjects } from '@/lib/projects';

export async function generateStaticParams() {
  return professionalProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = findProject('works', params.slug);
  return {
    title: project ? `${project.title} – Professional Work` : 'Project',
  };
}

export default function WorkProjectPage({ params }: { params: { slug: string } }) {
  const project = findProject('works', params.slug);
  if (!project) return notFound();
  return <ProjectDetailView project={project} backHref={'/works' as Route} />;
}
