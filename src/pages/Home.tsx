import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleFormaValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos."),
});

type NewCycleFormData = zod.infer<typeof newCycleFormaValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
}

function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormaValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number | undefined;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= activeCycle.minutesAmount * 60) {
          setAmountSecondsPassed(activeCycle.minutesAmount * 60);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeCycle]);

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }
  function handleInterrupCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <div className="flex flex-col items-center flex-1">
      <form
        action=""
        onSubmit={handleSubmit(handleCreateNewCycle)}
        className="flex flex-col items-center gap-14"
      >
        <div className="w-full flex items-center justify-center gap-2 text-gray-10 text-lg font-bold flex-wrap font-roboto">
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            id="task"
            placeholder="Dê um nome ao seu projeto"
            type="text"
            list="task-suggestions"
            disabled={!!activeCycle}
            {...register("task")}
            className="calendar-indication flex-1 bg-transparent h-10 border-0 border-b-2 border-gray-50 font-bol text-lg py-0 px-2 text-gray-10 placeholder:text-gray-50 focus:shadow-none focus:border-green-50"
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <input
            id="minutesAmount"
            placeholder="00"
            type="number"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })}
            className="bg-transparent h-10 border-0 border-b-2 border-gray-50 font-bol text-lg py-0 px-2 text-gray-10 w-16 placeholder:text-gray-50 focus:shadow-none focus:border-green-50"
          />

          <span>minutos.</span>
        </div>

        <div className="flex gap-4 font-robotoMon text-[10rem] text-gray-10 ">
          <span className="bg-gray-70 py-8 px-4 rounded-lg">{minutes[0]}</span>
          <span className="bg-gray-70 py-8 px-4 rounded-lg">{minutes[1]}</span>
          <div className="flex justify-center py-8 px-0 text-green-50 overflow-hidden w-16">
            :
          </div>
          <span className="bg-gray-70 py-8 px-4 rounded-lg">{seconds[0]}</span>
          <span className="bg-gray-70 py-8 px-4 rounded-lg">{seconds[1]}</span>
        </div>

        {activeCycle ? (
          <button
            type="button"
            onClick={handleInterrupCycle}
            className="flex justify-center items-center w-full border-0 p-4 rounded-lg gap-2 font-bold cursor-pointer bg-red-50 text-gray-10 enabled:hover:bg-red-70"
          >
            <HandPalm size={24} /> Interromper
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="flex justify-center items-center w-full border-0 p-4 rounded-lg gap-2 font-bold cursor-pointer bg-green-50 text-gray-10 enabled:hover:bg-green-70 disabled:bg-green-50/70 disabled:cursor-not-allowed"
          >
            <Play size={24} /> Começar
          </button>
        )}
      </form>
    </div>
  );
}

export default Home;
