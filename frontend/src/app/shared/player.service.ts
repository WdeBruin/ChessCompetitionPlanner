import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Player } from "../store/player/player.interface";

@Injectable()
export class PlayerService
{
    private apiEndpoint: string;

    constructor(private readonly http: HttpClient) {        
        this.apiEndpoint = "http://localhost:5000/api" // todo make configurable.
    }

    public getAllPlayers(): Observable<Player[]> {
        return this.http.get<Player[]>(`${this.apiEndpoint}/player`);
    }

    public addPlayer(player: Player): Observable<Player> {
        return this.http.post<Player>(`${this.apiEndpoint}/player`, player);
    }
}
