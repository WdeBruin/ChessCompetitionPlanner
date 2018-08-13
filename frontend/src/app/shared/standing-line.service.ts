import { environment } from '../..//environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { StandingLine } from "../store/standing-line/standing-line.interface";

@Injectable()
export class StandingLineService
{
    private apiEndpoint: string;

    constructor(private readonly http: HttpClient) {        
        this.apiEndpoint = environment.api;
    }

    public getStandingLines(standingId: number): Observable<StandingLine[]> {
        return this.http.get<StandingLine[]>(`${this.apiEndpoint}/standingline/standing/${standingId}`);
    }

    public addStandingLine(standing: StandingLine): Observable<StandingLine> {
        return this.http.post<StandingLine>(`${this.apiEndpoint}/standingline`, standing);
    }

    public updateStandingLine(standing: StandingLine): Observable<StandingLine> {
        return this.http.put<StandingLine>(`${this.apiEndpoint}/standingline/${standing.id}`, standing);
    }

    public deleteStandingLine(standingId: number): Observable<StandingLine> {
        return this.http.delete<StandingLine>(`${this.apiEndpoint}/standingline/${standingId}`);
    }
}
