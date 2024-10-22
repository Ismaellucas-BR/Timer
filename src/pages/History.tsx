import React from "react";

function getStatusClass(status: string) {
  switch (status) {
    case "Concluído":
      return "no-problem";
    case "Em andamento":
      return "alert";
    case "Interrompido":
      return "danger";
    default:
      return "";
  }
}

function History() {
  const tarefas = [
    {
      nome: "Tarefa",
      duracao: "20 minutos",
      inicio: "Há 2 meses",
      status: "Concluído",
    },
    {
      nome: "Tarefa",
      duracao: "20 minutos",
      inicio: "Há 2 meses",
      status: "Em andamento",
    },
    {
      nome: "Tarefa",
      duracao: "20 minutos",
      inicio: "Há 2 meses",
      status: "Interrompido",
    },
    {
      nome: "Tarefa",
      duracao: "20 minutos",
      inicio: "Há 2 meses",
      status: "Concluído",
    },
    {
      nome: "Tarefa",
      duracao: "20 minutos",
      inicio: "Há 2 meses",
      status: "Concluído",
    },
  ];

  return (
    <div className="flex flex-col flex-1 p-14">
      {/* History Container */}
      <h1 className="text-2xl text-gray-10">Meu histórico</h1>

      <div className="flex-1 overflow-auto mt-8">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="th-style rounded-tl-[8px] pl-6">Tarefa</th>
              <th className="th-style">Duração</th>
              <th className="th-style">Início</th>
              <th className="th-style rounded-tr-[8px] pr-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa, index) => (
              <tr key={index}>
                <td className="td-style">{tarefa.nome}</td>
                <td className="td-style">{tarefa.duracao}</td>
                <td className="td-style">{tarefa.inicio}</td>
                <td
                  className={`td-style status ${getStatusClass(tarefa.status)}`}
                >
                  {tarefa.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
