import { environment } from '../..//environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Standing } from "../store/standing/standing.interface";

@Injectable()
export class StandingService
{
    private apiEndpoint: string;

    constructor(private readonly http: HttpClient) {        
        this.apiEndpoint = environment.api;
    }

    public getStandings(roundId: number): Observable<Standing[]> {
        return this.http.get<Standing[]>(`${this.apiEndpoint}/standing/round/${roundId}`);
    }

    public addStanding(standing: Standing): Observable<Standing> {
        return this.http.post<Standing>(`${this.apiEndpoint}/standing`, standing);
    }

    public updateStanding(standing: Standing): Observable<Standing> {
        return this.http.put<Standing>(`${this.apiEndpoint}/standing/${standing.id}`, standing);
    }

    public deleteStanding(standingId: number): Observable<Standing> {
        return this.http.delete<Standing>(`${this.apiEndpoint}/standing/${standingId}`);
    }
}
