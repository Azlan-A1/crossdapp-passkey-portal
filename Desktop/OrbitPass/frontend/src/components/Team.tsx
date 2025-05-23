'use client';

import { motion, type Variants } from 'framer-motion';

const team = [
  {
    name: 'Alex Chen',
    role: 'Smart Contract Dev',
    avatar: '/team/alex.jpg',
    description: 'Rust & Soroban expert, focused on secure smart contract development'
  },
  {
    name: 'Sarah Martinez',
    role: 'Frontend Lead',
    avatar: '/team/sarah.jpg',
    description: 'React & Next.js specialist, crafting beautiful user experiences'
  },
  {
    name: 'Marcus Johnson',
    role: 'UX Designer',
    avatar: '/team/marcus.jpg',
    description: 'Passionate about making Web3 accessible to everyone'
  },
  {
    name: 'Priya Patel',
    role: 'Security Engineer',
    avatar: '/team/priya.jpg',
    description: 'Security-first approach to passkey implementation'
  }
];

export default function Team() {
  return (
    <section className="py-24 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Our Team
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6 text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-4xl text-gray-400">👤</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
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