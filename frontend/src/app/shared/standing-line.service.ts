import { environment } from '../..//environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StandingLine } from "../store/standing-line/standing-line.interface";

@Injectable()
export class StandingLineService
{
    private apiEndpoint: string;

    constructor(private readonly http: HttpClient) {        
        this.apiEndpoint = environment.api;
    }

    public getStandingLines(competitionId: number, roundNumber: number): Observable<StandingLine[]> {
        return this.http.get<StandingLine[]>(`${this.apiEndpoint}/standingline/standing/${competitionId}/${roundNumber}`);
    }

    public addStandingLine(standingLine: StandingLine): Observable<StandingLine> {
        return this.http.post<StandingLine>(`${this.apiEndpoint}/standingline`, standingLine);
    }

    public updateStandingLine(standingLine: StandingLine): Observable<StandingLine> {
        return this.http.put<StandingLine>(`${this.apiEndpoint}/standingline/${standingLine.id}`, standingLine);
    }

    public deleteStandingLine(standingLineId: number): Observable<StandingLine> {
        return this.http.delete<StandingLine>(`${this.apiEndpoint}/standingline/${standingLineId}`);
    }
}
