export type PhaseT = "WAITING" | "CREATING" | "DECK" | "FIGHT";

export interface IAttack {
    name: string;
    damage: number;
    heal: number;
    desc: string;
}

export interface ICard {
    name: string;
    health: number;
    cost: number;
    image: string;
    attacks: IAttack[];
}

export interface IPlayer {
    id?: string;
    name: string;
    money: number;
    deck: ICard[];
    activeCard: ICard; // index of Player.deck
    host: boolean;
}

export interface IRoom {
    phase: PhaseT;
    players: IPlayer[];
    currentRound: number;
    cardLibrary: ICard[];
}
