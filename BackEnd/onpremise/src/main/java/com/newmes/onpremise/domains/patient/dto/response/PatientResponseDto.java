package com.newmes.onpremise.domains.patient.dto.response;

import java.time.LocalDateTime;

import com.newmes.onpremise.domains.patient.domain.Patient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class PatientResponseDto {
    private String PID;
    private String sex;
    private int age;
    private String modality;
    private LocalDateTime visitDate;

    public static PatientResponseDto from(Patient patient, String parsedModality) {
        return new PatientResponseDto(
                patient.getPID(),
                patient.getSex().toString(),
                patient.getAge(),
                parsedModality,
                patient.getVisitDate()
        );
    }
}