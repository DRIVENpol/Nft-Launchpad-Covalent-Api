import Hero from "../components/Hero"
import Boxes from "../components/Boxes"

const projects = [
  {
      name: 'Project1',
      type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      link: 'https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_640.jpg',
      website: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
    },
    {
      name: 'Project2',
      type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      link: 'https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_640.jpg',
      facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
    },
    {
      name: 'Project3',
      type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      link: 'https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_640.jpg',
      facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
    },
    {
      name: 'Project4',
      type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      link: 'https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_640.jpg',
      facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
    },
    {
      name: 'Project5',
      type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      link: 'https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_640.jpg',
      facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
    },
    {
      name: 'Project6',
      type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      link: 'https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_640.jpg',
      facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
    },
    {
      name: 'Project7',
      type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      link: 'https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_640.jpg',
      facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
    },
    {
      name: 'Project8',
      type: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.',
      link: 'https://cdn.pixabay.com/photo/2018/01/24/17/33/light-bulb-3104355_640.jpg',
      facebook: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      discord: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf',
      twitter: 'https://github.com/DRIVENx/DRIVENsecurity-audits/blob/main/DRIVENsecurity_TCG_Fundamental_2022.pdf'
    },
    
]

export default function Home() {
  return (
    <>
     <Hero />
     <Boxes obj={projects} />
    </>
  )
}
