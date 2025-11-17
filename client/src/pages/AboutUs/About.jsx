import React, { useState } from "react";

const aboutUs = [
  {
    title: "Story",
    description:
      "Our journey began with a simple idea: to create a platform that connects people and ideas in meaningful ways. Over the years, we faced countless challenges, learned from failures, and celebrated milestones. The Story of our organization is one of persistence, innovation, and collaboration. Each step forward was guided by our vision and values, shaping the culture we embrace today. From humble beginnings to a growing team of dedicated individuals, the narrative continues to evolve, inspiring creativity, fostering learning, and strengthening our commitment to making a positive impact in the communities we serve.",
  },
  {
    title: "Mission",
    description:
      "Our mission is to empower individuals and organizations to achieve their fullest potential by providing innovative solutions, fostering collaboration, and promoting sustainable growth. We strive to make a difference in the lives of our clients and communities through creativity, integrity, and dedication. Every project we undertake reflects our commitment to excellence, continuous improvement, and responsible innovation. We aim to bridge gaps, solve complex problems, and enable opportunities that create value, drive progress, and leave a lasting, positive impact on society. Our mission is the foundation of everything we do.",
  },
  {
    title: "Success",
    description:
      "Success, for us, is measured not only by achievements and milestones but by the positive impact we create. It is about building trust, nurturing relationships, and delivering tangible results that exceed expectations. Every success story is a testament to our hard work, resilience, and collaborative efforts. We celebrate accomplishments, learn from challenges, and continuously refine our strategies to achieve excellence. Success is a journey, not a destination, and it is defined by growth, innovation, and the meaningful contributions we make to our clients, team members, and the wider community at every stage of our development.",
  },
  {
    title: "Team & Others",
    description:
      "Our team is the heart of our organization, bringing together diverse skills, experiences, and perspectives to achieve common goals. Collaboration, mutual respect, and open communication are core to how we operate. Each member contributes unique strengths, fostering innovation and creativity across projects. Beyond our team, we value partnerships with stakeholders, clients, and communities, recognizing that collective effort drives success. We celebrate achievements together, support one another through challenges, and continuously invest in personal and professional growth. Our culture encourages learning, empathy, and engagement, ensuring that both our team and extended network thrive together in harmony.",
  },
];

const About = () => {
  const [active, setActive] = useState("Story");
  const handleClick = (title) => {
    setActive(title);
  };
  const activeContent = aboutUs.find((item) => item.title === active);

  return (
    <div className="bg-white rounded-2xl px-20 py-10 my-10 space-y-10">
      <div className="space-y-5">
        <h1 className="text-5xl text-secondary font-bold">About Us</h1>
        <p>
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal <br /> packages to business shipments — we
          deliver on time, every time.
        </p>
      </div>
      <div>
        <ul className="list-none flex gap-5 cursor-pointer">
          {aboutUs.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item.title)}
              className={`text-2xl font-semibold ${
                active === item.title ? "text-red-500" : "text-black"
              }`}
            >
              {" "}
              {item.title}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <p>{activeContent.description}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
