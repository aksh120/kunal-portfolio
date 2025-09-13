import { notFound } from 'next/navigation';
import type { Route } from 'next';
import ProjectDetailView from '@/components/pages/ProjectDetailView';
import { findPersonalProject, personalProjects } from '@/lib/projects';

export async function generateStaticParams() {
  return personalProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = findPersonalProject(params.slug);
  return {
    title: project ? `${project.title} – Projects` : 'Project',
  };
}

export default function PersonalProjectPage({ params }: { params: { slug: string } }) {
  const project = findPersonalProject(params.slug);
  if (!project) return notFound();
  return <ProjectDetailView project={project} backHref={'/#projects' as Route} />;
}
