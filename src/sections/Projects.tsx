import { LiveProjectPreview } from '../components/LiveProjectPreview'
import { Reveal, SectionHeading } from '../components/Reveal'
import { projects } from '../data/projects'
import { useLanguage } from '../i18n/useLanguage'

export function Projects() {
  const { dictionary } = useLanguage()
  const copy = dictionary.projects

  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="shell">
        <Reveal>
          <SectionHeading id="projects-title" label={copy.label} title={copy.title} accent={copy.titleAccent} />
        </Reveal>
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08}>
              <LiveProjectPreview
                project={project}
                livePreview={copy.livePreview}
                livePreviewTitle={copy.livePreviewTitle}
                previewUnavailable={copy.previewUnavailable}
                previewBlocked={copy.previewBlocked}
                visitLiveSite={copy.liveSite}
                description={copy.description}
                featured={copy.featured}
                clientWork={copy.clientWork}
                technologiesLabel={copy.technologies}
                index={index}
              />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="more-projects"><span />{copy.more}<span /></p>
        </Reveal>
      </div>
    </section>
  )
}
