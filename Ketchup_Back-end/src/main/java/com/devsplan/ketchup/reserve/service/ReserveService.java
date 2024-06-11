package com.devsplan.ketchup.reserve.service;

import com.devsplan.ketchup.reserve.dto.ReserveDTO;
import com.devsplan.ketchup.reserve.entity.Reserve;
import com.devsplan.ketchup.reserve.repository.ReserveRepository;
import com.devsplan.ketchup.rsc.dto.ResourceDTO;
import com.devsplan.ketchup.rsc.entity.Resource;
import com.devsplan.ketchup.reserve.repository.ResourceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReserveService {

    private final ReserveRepository reserveRepository;
    private final ResourceRepository resourceRepository;
    private final ModelMapper modelMapper;

    public ReserveService(ReserveRepository reserveRepository, ResourceRepository resourceRepository, ModelMapper modelMapper) {
        this.reserveRepository = reserveRepository;
        this.resourceRepository = resourceRepository;
        this.modelMapper = modelMapper;
    }

    public List<ReserveDTO> getReserveWithResources(String rscCategory, LocalDateTime startOfDay, LocalDateTime endOfDay) {
        List<Object[]> results = reserveRepository.findResourcesWithOptionalReservationsForDay(rscCategory, startOfDay, endOfDay);

        return results.stream()
                .map(this::mapToReserveDTO)
                .collect(Collectors.toList());
    }

    private ReserveDTO mapToReserveDTO(Object[] result) {
        Resource resource = (Resource) result[0];
        Reserve reserve = (Reserve) result[1];

        ResourceDTO resourceDTO = convertToResourceDTO(resource);
        ReserveDTO reserveDTO = new ReserveDTO();

        if (reserve != null) {
            reserveDTO.setRsvNo(reserve.getRsvNo());
            reserveDTO.setRsvDescr(reserve.getRsvDescr());
            reserveDTO.setRsvStartDttm(reserve.getRsvStartDttm());
            reserveDTO.setRsvEndDttm(reserve.getRsvEndDttm());
            reserveDTO.setReserverId(reserve.getMemberNo());
            reserveDTO.setReserverName(reserve.getMemberName());
        }

        reserveDTO.setResources(resourceDTO);
        return reserveDTO;
    }

    private ResourceDTO convertToResourceDTO(Resource resource) {
        if (resource != null) {
            return new ResourceDTO(
                    resource.getRscNo(),
                    resource.getRscCategory(),
                    resource.getRscName(),
                    resource.getRscInfo(),
                    resource.getRscCap(),
                    resource.isRscIsAvailable(),
                    resource.getRscDescr()
            );
        }
        return null;
    }

    @Transactional
    public void insertResource(ResourceDTO resourceDTO) {
        Resource resource = new Resource(
                resourceDTO.getRscNo(),
                resourceDTO.getRscCategory(),
                resourceDTO.getRscName(),
                resourceDTO.getRscInfo(),
                resourceDTO.getRscCap(),
                resourceDTO.isRscIsAvailable(),
                resourceDTO.getRscDescr()
        );
        resourceRepository.save(resource);
    }

    @Transactional
    public void updateResource(ResourceDTO resourceDTO) {
        Resource resource = resourceRepository.findById((long) resourceDTO.getRscNo())
                .orElseThrow(() -> new IllegalArgumentException("Resource not found"));

        Resource updatedResource = new Resource(
                resource.getRscNo(),
                resource.getRscCategory(),
                resource.getRscName(),
                resource.getRscInfo(),
                resource.getRscCap(),
                resourceDTO.isRscIsAvailable(),
                resourceDTO.getRscDescr()
        );

        resourceRepository.save(updatedResource);
    }

    public Resource findResourceById(int rscNo) {
        return resourceRepository.findById((long) rscNo).orElse(null);
    }

    @Transactional
    public void insertReserve(ReserveDTO newReserve, Resource resource) {
        Reserve reserve = new Reserve(
                newReserve.getRsvNo(),
                newReserve.getRsvStartDttm(),
                newReserve.getRsvEndDttm(),
                newReserve.getRsvDescr(),
                newReserve.getReserverId(),
                newReserve.getReserverName(),
                resource
        );

        reserveRepository.save(reserve);
    }

    public Resource getResourceFromDatabase(int rscNo) {
        Optional<Resource> optionalResource = resourceRepository.findById((long) rscNo);
        return optionalResource.orElse(null);
    }

    @Transactional
    public void updateReserve(int rsvNo, String memberNo, ReserveDTO updateReserve) {
        Reserve foundReserve = reserveRepository.findById((long) rsvNo).orElseThrow(IllegalArgumentException::new);

        String reserver = foundReserve.getMemberNo();

        if (!memberNo.equals(reserver)) {
            throw new IllegalArgumentException("예약 수정 권한이 없습니다.");
        }

        Reserve updatedReserve = new Reserve(
                foundReserve.getRsvNo(),
                updateReserve.getRsvStartDttm(),
                updateReserve.getRsvEndDttm(),
                updateReserve.getRsvDescr(),
                foundReserve.getMemberNo(),
                foundReserve.getResources()
        );

        reserveRepository.save(updatedReserve);
    }

    @Transactional
    public void deleteById(int rsvNo, String memberNo) {
        Reserve reserve = reserveRepository.findById((long) rsvNo).orElseThrow(() -> new IllegalArgumentException("해당하는 예약 번호를 찾을 수 없습니다."));

        String reserver = reserve.getMemberNo();

        if (!memberNo.equals(reserver)) {
            throw new IllegalStateException("예약 삭제 권한이 없습니다.");
        }

        reserveRepository.delete(reserve);
    }
}
