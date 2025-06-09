package com.ogl.devtest.customer;

public class CityCustomerCount {
    private String city;
    private long count;

    public CityCustomerCount(String city, long count) {
        this.city = city;
        this.count = count;
    }

    public String getCity() {
        return city;
    }

    public long getCount() {
        return count;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setCount(long count) {
        this.count = count;
    }

}