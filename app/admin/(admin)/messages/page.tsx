"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { apiRequest, useApi } from "@/hooks/useApi";
import { TMessage } from "@/types/message.type";

const MessagePage = () => {
  const {
    data: contacts,
    loading: contactsLoading,
    refetch: refetchContacts,
  } = useApi<TMessage[]>("/api/contact");

  const handleMarkContactAsRead = async (id: string) => {
    const result = await apiRequest(`/api/contact/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: "read" }),
    });

    if (result.success) {
      refetchContacts();
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      const result = await apiRequest(`/api/contact/${id}`, {
        method: "DELETE",
      });
      if (result.success) {
        refetchContacts();
      } else {
        alert("Failed to delete contact");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your profile content
          </p>
        </div>
      </div>
      <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
        <CardHeader>
          <CardTitle className="text-gray-800 dark:text-white">
            Contact Messages
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Messages from your portfolio contact form
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contactsLoading ? (
            <div className="text-center py-8">Loading messages...</div>
          ) : contacts && contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <motion.div
                  key={contact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-white/10 dark:bg-gray-700/10 border border-white/20 dark:border-gray-600/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {contact.firstName} {contact.lastName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {contact.email}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          contact.status === "unread"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {contact.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkContactAsRead(contact._id)}
                        disabled={contact.status === "read"}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteContact(contact._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                    {contact.subject}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {contact.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-300">
              No messages yet
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MessagePage;
