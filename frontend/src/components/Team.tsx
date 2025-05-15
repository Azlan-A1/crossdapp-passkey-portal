'use client';

import { motion, type Variants } from 'framer-motion';

const team = [
  {
    name: 'Azlan Ahmad',
    role: 'Full Stack Developer',
    avatar: '/team/azlan.jpg',
    description: 'Passionate about building seamless Web3 experiences with modern technologies'
  }
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Developer
        </motion.h2>

        <div className="max-w-md mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8 text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-4xl text-gray-400">👤</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">{member.name}</h3>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-500/10 text-purple-400 mb-4">
                {member.role}
              </span>
              <p className="text-gray-400">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 