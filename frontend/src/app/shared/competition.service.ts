import { environment } from '../..//environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Competition } from "../store/competition/competition.interface";

@Injectable()
export class CompetitionService
{
    private apiEndpoint: string;

    constructor(private readonly http: HttpClient) {        
        this.apiEndpoint = environment.api;
    }

    public getAllCompetitions(): Observable<Competition[]> {
        return this.http.get<Competition[]>(`${this.apiEndpoint}/competition`);
    }

    public addCompetition(competition: Competition): Observable<Competition> {
        return this.http.post<Competition>(`${this.apiEndpoint}/competition`, competition);
    }
}
