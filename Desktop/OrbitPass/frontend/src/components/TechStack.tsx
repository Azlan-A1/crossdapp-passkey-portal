'use client';

import { motion, type Variants } from 'framer-motion';

const techStacks = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'React', color: 'from-blue-500 to-blue-600' },
      { name: 'Next.js', color: 'from-gray-500 to-gray-600' },
      { name: 'TailwindCSS', color: 'from-cyan-500 to-cyan-600' },
      { name: 'Framer Motion', color: 'from-purple-500 to-purple-600' },
    ]
  },
  {
    category: 'Blockchain',
    technologies: [
      { name: 'Stellar SDK', color: 'from-yellow-500 to-yellow-600' },
      { name: 'Soroban', color: 'from-orange-500 to-orange-600' },
      { name: 'Passkey Kit', color: 'from-green-500 to-green-600' },
    ]
  },
  {
    category: 'Infrastructure',
    technologies: [
      { name: 'Launchtube', color: 'from-red-500 to-red-600' },
      { name: 'RPC', color: 'from-indigo-500 to-indigo-600' },
      { name: 'Horizon API', color: 'from-pink-500 to-pink-600' },
    ]
  }
];

export default function TechStack() {
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
          Tech Stack
        </motion.h2>

        <div className="space-y-12">
          {techStacks.map((stack, index) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-white">{stack.category}</h3>
              <div className="flex flex-wrap gap-4">
                {stack.technologies.map((tech) => (
                  <motion.span
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${tech.color} text-white font-medium shadow-lg`}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 