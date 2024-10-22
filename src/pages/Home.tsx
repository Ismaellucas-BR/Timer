import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const newCycleFormaValidationSchema = zod.object({
  task: zod.string().min(1, "Infrome a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormaValidationSchema>;

function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormaValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data);
    reset();
  }
  const task = watch("task");
  const isSubmitDisable = !task;

  return (
    <div className="flex flex-col items-center flex-1">
      <form
        action=""
        onSubmit={handleSubmit(handleCreateNewCycle)}
        className="flex flex-col items-center gap-14"
      >
        {" "}
        <div className="w-full flex items-center justify-center gap-2 text-gray-10 text-lg font-bold flex-wrap font-roboto">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            id="task"
            placeholder="Dê um nome ao seu projeto"
            type="text"
            list="task-suggestions"
            {...register("task")}
            className="calendar-indication flex-1 bg-transparent h-10 border-0 border-b-2 border-gray-50 font-bol text-lg py-0 px-2 text-gray-10 placeholder:text-gray-50 focus:shadow-none focus:border-green-50"
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="task">durante</label>
          <input
            id="minutesAmount"
            placeholder="00"
            type="number"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
            className="bg-transparent h-10 border-0 border-b-2 border-gray-50 font-bol text-lg py-0 px-2 text-gray-10 w-16 placeholder:text-gray-50 focus:shadow-none focus:border-green-50"
          />

          <span>minutos.</span>
        </div>
        <div className="flex gap-4 font-robotoMon text-[10rem] text-gray-10 ">
          {/*Countdowncontainer*/}
          <span className="bg-gray-70 py-8 px-4 rounded-lg">0</span>
          <span className="bg-gray-70 py-8 px-4 rounded-lg">0</span>
          <div className="flex justify-center py-8 px-0 text-green-50 overflow-hidden w-16">
            :
          </div>
          <span className="bg-gray-70 py-8 px-4 rounded-lg">0</span>
          <span className="bg-gray-70 py-8 px-4 rounded-lg">0</span>
        </div>
        <button
          type="submit"
          disabled={isSubmitDisable}
          className="flex justify-center items-center w-full border-0 p-4 rounded-lg gap-2 font-bold cursor-pointer bg-green-50 text-gray-10 enabled:hover:bg-green-70 disabled:bg-green-50/70 disabled:cursor-not-allowed"
        >
          <Play size={24} /> Começar
        </button>
      </form>
    </div>
  );
}

export default Home;
