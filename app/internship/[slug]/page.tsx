import { notFound } from 'next/navigation';
import type { Route } from 'next';
import ProjectDetailView from '@/components/pages/ProjectDetailView';
import { findProject, internshipProjects } from '@/lib/projects';

export async function generateStaticParams() {
  return internshipProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = findProject('internship', params.slug);
  return {
    title: project ? `${project.title} – Internship Work` : 'Project',
  };
}

export default function InternshipProjectPage({ params }: { params: { slug: string } }) {
  const project = findProject('internship', params.slug);
  if (!project) return notFound();
  return <ProjectDetailView project={project} backHref={'/internship' as Route} />;
}
