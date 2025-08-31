import React from 'react'
const Header = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">O'quv Markazi</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600">Bosh sahifa</a>
            <a href="#courses" className="text-gray-700 hover:text-blue-600">Kurslar</a>
            <a href="#teachers" className="text-gray-700 hover:text-blue-600">O'qituvchilar</a>
            <a href="#results" className="text-gray-700 hover:text-blue-600">Natijalar</a>
          </nav>

          <div className="flex items-center space-x-4">
            {user && isAdmin() && (
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                <Shield className="h-4 w-4 inline mr-1" />
                Admin Panel
              </button>
            )}
            {user ? (
              <button
                onClick={signOut}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Chiqish
              </button>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Kirish
              </button>
            )}
            
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-blue-600">Bosh sahifa</a>
              <a href="#courses" className="text-gray-700 hover:text-blue-600">Kurslar</a>
              <a href="#teachers" className="text-gray-700 hover:text-blue-600">O'qituvchilar</a>
              <a href="#results" className="text-gray-700 hover:text-blue-600">Natijalar</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};


export default Header