import React from 'react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchCourses(),
      fetchTeachers(),
      fetchResults()
    ]);
  };

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
    setCourses(data || []);
  };

  const fetchTeachers = async () => {
    const { data } = await supabase.from('teachers').select('*').order('created_at', { ascending: false });
    setTeachers(data || []);
  };

  const fetchResults = async () => {
    const { data } = await supabase.from('results').select('*').order('created_at', { ascending: false });
    setResults(data || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { key: 'courses', label: 'Kurslar', icon: BookOpen },
                { key: 'teachers', label: "O'qituvchilar", icon: Users },
                { key: 'results', label: 'Natijalar', icon: Award }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'courses' && (
              <CourseManager courses={courses} onUpdate={fetchCourses} />
            )}
            {activeTab === 'teachers' && (
              <TeacherManager teachers={teachers} onUpdate={fetchTeachers} />
            )}
            {activeTab === 'results' && (
              <ResultManager results={results} onUpdate={fetchResults} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard