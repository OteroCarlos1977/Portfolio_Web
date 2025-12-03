import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import profileData from '../data/profile.json';

const PortfolioContext = createContext();

const STORAGE_KEY = 'portfolio-data';
const AUTH_KEY = 'portfolio-auth';

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(profileData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar datos guardados/localStorage o datos iniciales del JSON
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const storedAuth = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (error) {
        console.error('Error al parsear datos guardados, usando valores por defecto', error);
      }
    }
    if (storedAuth) {
      setIsAuthenticated(storedAuth === 'true');
    }
  }, []);

  // Sincronizar con localStorage para simular edición del JSON
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = (username, password) => {
    if (username === 'carlos' && password === '1234') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const updateProfileField = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSkills = (category, values) => {
    setData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: values,
      },
    }));
  };

  const addProject = (project) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (index, updated) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) => (i === index ? updated : proj)),
    }));
  };

  const deleteProject = (index) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const value = useMemo(
    () => ({
      data,
      isAuthenticated,
      login,
      logout,
      updateProfileField,
      updateSkills,
      addProject,
      updateProject,
      deleteProject,
    }),
    [data, isAuthenticated]
  );

  /*
   * Futuro: para reemplazar este JSON por datos reales, basta con cambiar el origen del estado inicial
   * a una llamada fetch/axios dentro de un useEffect y sincronizar los setters con la respuesta de la API.
   */

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio debe usarse dentro de un PortfolioProvider');
  }
  return context;
};
