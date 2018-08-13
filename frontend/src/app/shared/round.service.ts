import { environment } from '../..//environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Round } from "../store/round/round.interface";

@Injectable()
export class RoundService
{
    private apiEndpoint: string;

    constructor(private readonly http: HttpClient) {        
        this.apiEndpoint = environment.api;
    }

    public getRounds(competitionId: number): Observable<Round[]> {
        return this.http.get<Round[]>(`${this.apiEndpoint}/round/competition/${competitionId}`);
    }

    public addRound(round: Round): Observable<Round> {
        // let numbers: Number[] = [1,2,3,4,5]
        // let converted = numbers.toString();
        return this.http.post<Round>(`${this.apiEndpoint}/round`, round);
    }

    public updateRound(round: Round): Observable<Round> {
        return this.http.put<Round>(`${this.apiEndpoint}/round/${round.id}`, round);
    }

    public deleteRound(roundId: number): Observable<Round> {
        return this.http.delete<Round>(`${this.apiEndpoint}/round/${roundId}`);
    }
}
