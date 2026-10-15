export interface Project {
  name: string
  liveUrl: string
  previewEnabled: boolean
  technologies: string[]
  type: 'clientWork'
  translationKey: 'nicolebosiacka'
}

export const projects: Project[] = [
  {
    name: 'nicolebosiacka.pl',
    liveUrl: 'https://nicolebosiacka.pl',
    previewEnabled: true,
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    type: 'clientWork',
    translationKey: 'nicolebosiacka',
  },
]
