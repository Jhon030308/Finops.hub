import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');

  // Função para carregar a lista de departamentos
  const fetchDepartments = () => {
    axios.get('http://localhost:8080/departments')
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Erro ao buscar departamentos:', error));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Função disparada ao clicar no botão Cadastrar
  const handleSubmit = (e) => {
    e.preventDefault();

    const newDepartment = {
      name: name,
      budgetLimit: parseFloat(budgetLimit)
    };

    axios.post('http://localhost:8080/departments', newDepartment)
      .then(() => {
        setName('');
        setBudgetLimit('');
        fetchDepartments(); // Atualiza a lista na tela imediatamente
      })
      .catch(error => {
        console.error('Erro ao cadastrar departamento:', error);
        alert('Erro ao enviar requisição. Verifique se a API Spring Boot aceita conexões CORS.');
      });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Formulário */}
        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-slate-200">Novo Departamento</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Nome do Departamento</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ex: Engenharia de Software" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Limite do Orçamento (R$)</label>
              <input 
                type="number" 
                value={budgetLimit}
                onChange={e => setBudgetLimit(e.target.value)}
                placeholder="Ex: 75000" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-end">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-md cursor-pointer"
              >
                Cadastrar Departamento
              </button>
            </div>
          </form>
        </section>

        {/* Lista de Departamentos */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-200">Departamentos Cadastrados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map(dept => (
              <div key={dept.id} className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono bg-slate-700 text-blue-300 px-2 py-1 rounded">#ID {dept.id}</span>
                  <h3 className="text-lg font-bold text-slate-100 mt-2">{dept.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Teto Orçamental</span>
                  <span className="text-lg font-semibold text-emerald-400">
                    R$ {Number(dept.budgetLimit).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}