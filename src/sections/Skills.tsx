import { CodeEditorCard } from '../components/CodeEditorCard'
import { Reveal, SectionHeading } from '../components/Reveal'
import { skills as skillExamples } from '../data/skills'
import { useLanguage } from '../i18n/useLanguage'

export function Skills() {
  const { dictionary } = useLanguage()
  const copy = dictionary.skills

  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="skills-title"
            label={copy.label}
            title={copy.title}
            accent={copy.titleAccent}
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="skills-intro">
            <p>{copy.skillEditorTitle}</p>
            <span>{copy.skillEditorDescription}</span>
          </div>
        </Reveal>
        <div className="skill-groups">
          {copy.groups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.08}>
              <div className="skill-group">
                <div className="skill-group-heading">
                  <span>0{groupIndex + 1}</span>
                  <h3>{group.title}</h3>
                  <span className="skill-group-rule" />
                </div>
                <div className="skill-list">
                  {skillExamples
                    .filter((skill) => skill.category === group.category)
                    .map((skill, skillIndex) => (
                      <CodeEditorCard
                        key={skill.name}
                        skill={skill}
                        stagger={groupIndex * 240 + skillIndex * 170}
                      />
                    ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="skills-note"><span />{copy.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
