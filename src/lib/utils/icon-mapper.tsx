import React from 'react';
import { AiOutlineAudit } from 'react-icons/ai';
import { FaCog, FaHome, FaUser } from 'react-icons/fa';

export const IconMapper: Record<string, React.ReactNode> = {
  FaHome: <FaHome />,
  FaSystem: <FaCog />,
  AiOutlineAudit: <AiOutlineAudit />,
  FaUser: <FaUser />,
};
