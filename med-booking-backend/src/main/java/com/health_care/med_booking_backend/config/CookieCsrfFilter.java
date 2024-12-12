package com.health_care.med_booking_backend.config;

import java.io.IOException;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Spring Security 6 doesn't set a XSRF-TOKEN cookie by default.
 * This solution is
 * <a href="https://github.com/spring-projects/spring-security/issues/12141#issuecomment-1321345077">
 * recommended by Spring Security.</a>
 */
public class CookieCsrfFilter extends OncePerRequestFilter {

    /**
     * {@inheritDoc}
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        // Set the XSRF-TOKEN cookie from the CsrfToken in the request attributes
        CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        // set the XSRF-TOKEN cookie in the response headers
        response.setHeader(csrfToken.getHeaderName(), csrfToken.getToken());
        // do the rest of the filter chain
        filterChain.doFilter(request, response);
    }
}
