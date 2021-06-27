export type PhaseT = "WAITING" | "CREATING" | "DECK" | "FIGHT";

export interface IAttack {
    name: string;
    damage?: number;
    heal?: number;
    desc: string;
}

export interface IPreviewCard {
    name: string;
    health: number;
    imgURL: string;
    attacks: IAttack[];
}

export interface ICard extends IPreviewCard {
    id: string;
    cardCost: number;
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
    players: Record<string, IPlayer>;
    currentRound: number;
    cardLibrary: ICard[];
    activePlayerID: string;
}

export interface IAttackBroadcast {
    attacker: string;
    reciever: string;
    attack: IAttack;
}