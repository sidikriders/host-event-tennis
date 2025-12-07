import React from 'react';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children, actions }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-tennis-court via-tennis-net to-primary-900 relative">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-primary-100">
          <div className="flex items-start justify-between mb-6">
            <div>
              {title && (
                <h1 className="text-2xl md:text-3xl font-display font-bold text-tennis-court">{title}</h1>
              )}
            </div>
            <div>{actions}</div>
          </div>

          <div>{children}</div>
        </div>
      </div>

      <div className="absolute top-10 right-10 w-40 h-40 bg-tennis-ball/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-400/20 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Layout;
