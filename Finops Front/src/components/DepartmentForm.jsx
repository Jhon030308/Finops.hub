import { useState } from 'react';
import { api } from '../services/api';
import { PlusCircle } from 'lucide-react';

export default function DepartmentForm({ onDepartmentAdded }) {
  const [name, setName] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !budgetLimit) return;

    setLoading(true);
    try {
      const response = await api.post('/departments', {
        name,
        budgetLimit: parseFloat(budgetLimit),
      });

      // Limpa os campos após salvar
      setName('');
      setBudgetLimit('');

      // Notifica o componente pai para atualizar a lista automaticamente
      if (onDepartmentAdded) {
        onDepartmentAdded(response.data);
      }
    } catch (error) {
      console.error('Erro ao cadastrar departamento:', error);
      alert('Erro ao cadastrar departamento. Verifique se o backend está a rodar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-600" />
        Novo Departamento
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nome do Departamento
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Engenharia de Software"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Limite do Orçamento (R$)
          </label>
          <input
            type="number"
            step="0.01"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(e.target.value)}
            placeholder="Ex: 75000.00"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'A cadastrar...' : 'Cadastrar Departamento'}
      </button>
    </form>
  );
}