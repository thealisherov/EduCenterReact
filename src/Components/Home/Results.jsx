import React from 'react'

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('results')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) {
        setResults(data || []);
      }
    } catch (err) {
      console.error('Results fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="results" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Natijalar yuklanmoqda...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="results" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O'quvchilarimizning Natijalari
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Muvaffaqiyatli bitiruv sertifikatlari va yutuqlar
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result) => (
            <Card key={result.id} className="transition-transform hover:scale-105">
              {result.image_url && (
                <img
                  src={result.image_url}
                  alt={result.title}
                  className="w-full h-64 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                  {result.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
        
        {results.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Hozircha natijalar mavjud emas
          </div>
        )}
      </div>
    </section>
  );
};




export default Results