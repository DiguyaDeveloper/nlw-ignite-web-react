import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { Input } from "../../../../components/Input/Input";
import { RadixSelect } from "../../../../components/select/Select";
import { useEffect, useState } from "react";
import { Game } from "../../../games/interfaces/game.interface";

const weekDays: { title: string; value: string; day: number }[] = [
  {
    title: "Domingo",
    value: "D",
    day: 1,
  },
  {
    title: "Segunda",
    value: "S",
    day: 2,
  },
  {
    title: "Terça",
    value: "T",
    day: 3,
  },
  {
    title: "Quarta",
    value: "Q",
    day: 4,
  },
  {
    title: "Quinta",
    value: "Q",
    day: 5,
  },
  {
    title: "Sexta",
    value: "S",
    day: 6,
  },
  {
    title: "Sabado",
    value: "S",
    day: 7,
  },
];

export function AdsCreateForm() {
  const [selectedGame, setSelectedGame] = useState<string>();
  const [games, setGames] = useState<Game[]>([]);

  const getGames = (): void => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data: Game[]) => {
        setGames(data);
      });
  };

  useEffect(getGames, []);

  return (
    <form className="mt-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="game" className="font-semibold">
          Qual o game?
        </label>
        <RadixSelect
          id="game"
          placeholder="Selecione o game que deseja jogar"
          aria-label="games"
          onValueChange={setSelectedGame}
          items={games.map((game) => {
            return {
              label: game.title,
              value: game.id,
            };
          })}
        ></RadixSelect>
      </div>

      <div>
        <label htmlFor="name">Seu nome (ou nickname)</label>
        <Input id="name" placeholder="Como te chamam dentro do game?" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
          <Input id="yearsPlaying" placeholder="Tudo bem ser ZERO" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="discord">Qual seu discord?</label>
          <Input id="discord" placeholder="Usuario#0000" />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="weekDays">Quando costuma jogar?</label>

          <ToggleGroup.Root type="multiple" className="grid grid-cols-2 gap-2">
            {weekDays.map(
              (weekDay: { title: string; value: string; day: number }) => {
                return (
                  <ToggleGroup.Item
                    key={weekDay.day}
                    value={String(weekDay.day)}
                    title={weekDay.title}
                    className="w-8 h-8 rounded bg-zinc-900"
                  >
                    {weekDay.value}
                  </ToggleGroup.Item>
                );
              }
            )}
          </ToggleGroup.Root>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="weekDays">Qual horário do dia?</label>
          <div className="grid grid-cols-2 gap-2">
            <Input id="hourStart" type="time" placeholder="De" />
            <Input id="hourEnd" type="time" placeholder="Até" />
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 text-sm">
        <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
          <Checkbox.Indicator>
            <Check className="w-4 h-4 text-emerald-400"></Check>
          </Checkbox.Indicator>
        </Checkbox.Root>
        Costumo me conectar ao chat de voz
      </div>

      <footer className="mt-4 flex justify-end gap-4">
        <Dialog.Close
          type="button"
          className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
        >
          Cancelar
        </Dialog.Close>
        <button
          className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
          type="submit"
        >
          <GameController className="w-6 h-6" />
          Encontrar duo
        </button>
      </footer>
    </form>
  );
}
