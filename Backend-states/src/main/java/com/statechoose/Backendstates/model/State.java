package com.statechoose.Backendstates.model;

import javax.persistence.*;

@Entity
@Table(name="state")
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="number")
    private int number;

    @Column(name="name")
    private String name;

    @Column(name="employment")
    private double employment;

    @Column(name="taxes")
    private double taxes;

    @Column(name="growth")
    private double growth;

    @Column(name="income")
    private int income;

    @Column(name="home")
    private int home;

    @Column(name="graduation")
    private int graduation;

    @Column(name="college")
    private double college;

    @Column(name="poverty")
    private double poverty;

    @Column(name="homicide")
    private double homicide;

    @Column(name="insurance")
    private double insurance;

    @Column(name="climate")
    private double climate;

    @Column(name="rent")
    private int rent;

    public State() {

    }

    public State(String name,
                 double employment,
                 double taxes,
                 double growth,
                 int income,
                 int home,
                 int graduation,
                 double college,
                 double poverty,
                 double homicide,
                 double insurance,
                 double climate,
                 int rent) {
        this.name = name;
        this.employment = employment;
        this.taxes = taxes;
        this.growth = growth;
        this.income = income;
        this.home = home;
        this.graduation = graduation;
        this.college = college;
        this.poverty = poverty;
        this.homicide = homicide;
        this.insurance = insurance;
        this.climate = climate;
        this.rent = rent;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getEmployment() {
        return employment;
    }

    public void setEmployment(double employment) {
        this.employment = employment;
    }

    public double getTaxes() {
        return taxes;
    }

    public void setTaxes(double taxes) {
        this.taxes = taxes;
    }

    public double getGrowth() {
        return growth;
    }

    public void setGrowth(double growth) {
        this.growth = growth;
    }

    public int getIncome() {
        return income;
    }

    public void setIncome(int income) {
        this.income = income;
    }

    public int getHome() {
        return home;
    }

    public void setHome(int home) {
        this.home = home;
    }

    public int getGraduation() {
        return graduation;
    }

    public void setGraduation(int graduation) {
        this.graduation = graduation;
    }

    public double getCollege() {
        return college;
    }

    public void setCollege(double college) {
        this.college = college;
    }

    public double getPoverty() {
        return poverty;
    }

    public void setPoverty(double poverty) {
        this.poverty = poverty;
    }

    public double getHomicide() {
        return homicide;
    }

    public void setHomicide(double homicide) {
        this.homicide = homicide;
    }

    public double getInsurance() {
        return insurance;
    }

    public void setInsurance(double insurance) {
        this.insurance = insurance;
    }

    public double getClimate() {
        return climate;
    }

    public void setClimate(double climate) {
        this.climate = climate;
    }

    public int getRent() {
        return rent;
    }

    public void setRent(int rent) {
        this.rent = rent;
    }
}
