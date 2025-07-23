"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HeartHandshake,
  Users,
  Globe2,
  ArrowRight,
  Sparkles,
  MapPin,
  Award,
  Linkedin,
  Mail,
} from "lucide-react";

const founders = [
  {
    name: "Alex Calipusan",
    role: "Co-Founder & Executive Director",
    location: "Las Vegas, Nevada",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Passionate advocate for community empowerment with over 10 years of experience in nonprofit leadership.",
    achievements: [
      "Community Leader Award 2023",
      "500+ Lives Impacted",
      "Founded 15+ Programs",
    ],
    social: {
      linkedin: "#",
      email: "alex@upliftfoundation.org",
    },
  },
  {
    name: "Vi-anne Calipusan",
    role: "Co-Founder & Program Director",
    location: "Las Vegas, Nevada",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Dedicated to creating sustainable change through education and healthcare initiatives in underserved communities.",
    achievements: [
      "Healthcare Innovation Award",
      "300+ Families Served",
      "Medical Mission Leader",
    ],
    social: {
      linkedin: "#",
      email: "vianne@upliftfoundation.org",
    },
  },
];

const teamMembers = [
  {
    name: "Maria Santos",
    role: "Philippines Operations Manager",
    location: "Manila, Philippines",
    image: "/placeholder.svg?height=300&width=300",
    specialty: "Community Outreach",
  },
  {
    name: "James Rodriguez",
    role: "Volunteer Coordinator",
    location: "Las Vegas, Nevada",
    image: "/placeholder.svg?height=300&width=300",
    specialty: "Event Management",
  },
  {
    name: "Sarah Chen",
    role: "Education Program Lead",
    location: "California, USA",
    image: "/placeholder.svg?height=300&width=300",
    specialty: "Youth Development",
  },
  {
    name: "Miguel Torres",
    role: "Medical Mission Coordinator",
    location: "Cebu, Philippines",
    image: "/placeholder.svg?height=300&width=300",
    specialty: "Healthcare Access",
  },
];

const stats = [
  { number: "50+", label: "Active Volunteers", icon: Users },
  { number: "15+", label: "Countries Reached", icon: Globe2 },
  { number: "1000+", label: "Lives Transformed", icon: HeartHandshake },
  { number: "5+", label: "Years of Service", icon: Award },
];

export default function AboutTeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="team">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-[#F3954A]" />
            <span className="text-[#F3954A] font-semibold uppercase tracking-wide text-sm">
              Our Team
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet the People Behind the Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Built with compassion, led by love. Our diverse team of passionate
            individuals works tirelessly to create lasting change in communities
            worldwide.
          </p>
        </motion.div>

        {/* Team Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/uplift-logo.png?height=500&width=1200"
              alt="Uplift Foundation International team working together"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="max-w-3xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  United by Purpose, Driven by Compassion
                </h3>
                <p className="text-lg opacity-90 mb-6">
                  From volunteers in Las Vegas to grassroots partners across the
                  Philippines, each member brings unique strength and purpose to
                  our movement.
                </p>
                <div className="flex flex-wrap gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2"
                    >
                      <stat.icon className="h-5 w-5 text-[#F3954A]" />
                      <span className="font-bold">{stat.number}</span>
                      <span className="text-sm opacity-90">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Founders Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Founders
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet Alex and Vi-anne Calipusan, whose unwavering dedication and
              leadership inspire everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              >
                <div className="relative h-80">
                  <img
                    src={founder.image || "/placeholder.svg"}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-2xl font-bold mb-1">{founder.name}</h4>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {founder.location}
                    </p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h5 className="text-xl font-semibold text-[#F3954A] mb-2">
                      {founder.role}
                    </h5>
                    <p className="text-gray-600 leading-relaxed">
                      {founder.bio}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h6 className="font-semibold text-gray-900 mb-3">
                      Key Achievements
                    </h6>
                    <div className="space-y-2">
                      {founder.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#F3954A] rounded-full flex-shrink-0" />
                          <span className="text-gray-600 text-sm">
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="border-[#F3954A] text-[#F3954A] hover:bg-[#F3954A] hover:text-white rounded-full bg-transparent">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Connect
                    </button>
                    <button className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-full bg-transparent">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/*
  <!-- Team Members Grid -->
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="mb-20"
  >
    <div className="text-center mb-12">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Our Global Team
      </h3>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Dedicated professionals and volunteers working across continents
        to make our mission a reality.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {teamMembers.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-medium">{member.specialty}</p>
            </div>
          </div>

          <div className="p-6 text-center">
            <h4 className="text-lg font-bold text-gray-900 mb-1">
              {member.name}
            </h4>
            <p className="text-[#F3954A] font-medium text-sm mb-2">
              {member.role}
            </p>
            <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
              <MapPin className="h-3 w-3" />
              {member.location}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
*/}

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="/placeholder.svg?height=300&width=1200"
              alt="Join our team"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F3954A]/90 to-[#2A61AC]/90" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-3xl">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Want to Join Our Team?
                </h3>
                <p className="text-xl mb-8 opacity-90">
                  We're always looking for passionate individuals who share our
                  values and want to make a difference in the world.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-[#F3954A] hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg">
                    View Open Positions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
