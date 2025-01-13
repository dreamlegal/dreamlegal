// components/Alert.js
"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const Alert = ({ message, type = 'success', onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 shadow-lg ${
          type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle size={20} className="text-green-500" />
        ) : (
          <AlertCircle size={20} className="text-red-500" />
        )}
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 rounded-full p-1 hover:bg-white/20"
        >
          <X size={16} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;