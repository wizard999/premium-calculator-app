export interface PremiumModel {
    name: string;
    age: number;
    dateOfBirth: string;
    occupation: string;
    deathCoverAmount: number;
    rating: string;
    factor: number;
}

export interface OccupationModel {
    occupation: string;
    rating: string;
    factor: number;
}

export interface OccupationRatingModel {
    rating: string;
    factor: number;
}
