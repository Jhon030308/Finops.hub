import { useEffect, useState } from 'react';
import { api } from "../services/api";
import { Building2, DollarSign } from 'lucide-react';

export function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Procura os departamentos no backend Spring Boot (porta 8080)
    api.get('/departments')
      .then((response) => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar departamentos:', err);
        setError('Não foi possível carregar os departamentos.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-600 font-medium">A carregar departamentos...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 font-medium">{error}</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Building2 className="w-7 h-7 text-indigo-600" />
        FinOps Hub - Departamentos
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
              ID #{dept.id}
            </span>
            <h2 className="text-lg font-bold text-slate-800 mt-1">{dept.name}</h2>
            
            <div className="flex items-center gap-1 text-slate-600 mt-3 font-medium">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <span>
                Orçamento: R$ {Number(dept.budgetLimit).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}