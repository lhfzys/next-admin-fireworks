import React from 'react';
import {
  FaBook,
  FaCog,
  FaComments,
  FaDatabase,
  FaFileVideo,
  FaHome,
  FaHouseUser,
  FaLayerGroup,
  FaList,
  FaPencilRuler,
  FaQrcode,
  FaReadme,
  FaRegListAlt,
  FaSchool,
  FaServer,
  FaUser,
  FaUserSecret,
} from 'react-icons/fa';
import { FaComputer, FaPeopleGroup } from 'react-icons/fa6';
import { PiStudent } from 'react-icons/pi';
import { SiLibreofficemath } from 'react-icons/si';

export const IconMapper: Record<string, React.ReactNode> = {
  '': null,
  // Fa
  FaHome: <FaHome />,
  FaSystem: <FaCog />,
  FaUser: <FaUser />,
  FaUserSecret: <FaUserSecret />,
  FaList: <FaList />,
  FaServer: <FaServer />,
  FaFileVideo: <FaFileVideo />,
  FaRegListAlt: <FaRegListAlt />,
  FaReadme: <FaReadme />,
  FaBook: <FaBook />,
  FaQrcode: <FaQrcode />,
  PiStudent: <PiStudent />,
  SiLibreofficemath: <SiLibreofficemath />,
  FaPeopleGroup: <FaPeopleGroup />,
  FaLayerGroup: <FaLayerGroup />,
  FaHouseUser: <FaHouseUser />,
  FaComputer: <FaComputer />,
  FaPencilRuler: <FaPencilRuler />,
  FaSchool: <FaSchool />,
  FaDatabase: <FaDatabase />,
  FaComments: <FaComments />,
};
