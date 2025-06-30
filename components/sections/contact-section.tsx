import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PersonalInfo } from "@/types/personal.type";
import { apiRequest } from "@/hooks/useApi";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type PropTypes = {
  personalInfo: PersonalInfo | null;
};
const ContactSection = ({ personalInfo }: PropTypes) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await apiRequest("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactForm),
    });

    if (result.success) {
      alert("Message sent successfully!");
      setContactForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      alert("Failed to send message. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-purple-900/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Let's discuss your next project or collaboration opportunity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: personalInfo?.email || "your.email@example.com",
                      href: `mailto:${
                        personalInfo?.email || "your.email@example.com"
                      }`,
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: personalInfo?.phone || "+1 (555) 123-4567",
                      href: `tel:${personalInfo?.phone || "+15551234567"}`,
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      value: personalInfo?.location || "Your City, Country",
                      href: "#",
                    },
                  ].map((contact, index) => (
                    <motion.a
                      key={index}
                      href={contact.href}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-start space-x-4 p-4 rounded-lg bg-white/10 dark:bg-gray-700/10 hover:bg-white/20 dark:hover:bg-gray-600/20 transition-all duration-300"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <contact.icon className="h-6 w-6 text-white" />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {contact.label}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {contact.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-white/20 dark:border-gray-700/20">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: Github,
                        href: personalInfo?.socialLinks?.github || "#",
                      },
                      {
                        icon: Linkedin,
                        href: personalInfo?.socialLinks?.linkedin || "#",
                      },
                      {
                        icon: Mail,
                        href: `mailto:${
                          personalInfo?.email || "your.email@example.com"
                        }`,
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                      >
                        <social.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Send Message
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <Input
                        placeholder=""
                        value={contactForm.firstName}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            firstName: e.target.value,
                          })
                        }
                        className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/30"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <Input
                        placeholder=""
                        value={contactForm.lastName}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            lastName: e.target.value,
                          })
                        }
                        className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/30"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder=""
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      placeholder=""
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          subject: e.target.value,
                        })
                      }
                      className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      className="bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-700/30"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
