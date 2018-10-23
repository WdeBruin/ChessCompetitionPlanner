import { environment } from '../..//environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Game } from "../store/game/game.interface";

@Injectable()
export class GameService
{
    private apiEndpoint: string;

    constructor(private readonly http: HttpClient) {        
        this.apiEndpoint = environment.api;
    }

    public getAllGames(competitionId: number): Observable<Game[]> {
        return this.http.get<Game[]>(`${this.apiEndpoint}/game/all/${competitionId}`);
    }

    public addGame(game: Game): Observable<Game> {
        return this.http.post<Game>(`${this.apiEndpoint}/game`, game);
    }

    public updateGame(game: Game): Observable<Game> {
        return this.http.put<Game>(`${this.apiEndpoint}/game/${game.id}`, game);
    }

    public deleteGame(gameId: number): Observable<Game> {
        return this.http.delete<Game>(`${this.apiEndpoint}/game/${gameId}`);
    }
}
