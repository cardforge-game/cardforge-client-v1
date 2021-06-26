declare type PhaseT = "WAITING" | "CREATING" | "DECK" | "FIGHT";

declare interface IAttack {
    name: string;
    damage: number;
    heal: number;
    desc: string;
}

declare interface ICard {
    name: string;
    health: number;
    cost: number;
    image: string;
    attacks: IAttack[];
}

declare interface IPlayer {
    name: string;
    money: number;
    deck: ICard[];
    activeCard: ICard; // index of Player.deck
    host: boolean;
}

declare interface IRoom {
    phase: PhaseT;
    players: IPlayer[];
    currentRound: number;
    cardLibrary: ICard[];
}
