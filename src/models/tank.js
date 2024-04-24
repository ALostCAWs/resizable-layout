export class Tank {
  constructor({
    id,
    volume,
    volume_unit,
    is_cycled,
    filtration,
    substrate,
    temperature_setting,
    temperature_unit,
    livestock,
    plants,
    light_settings,
    parameters,
    test_schedule,
    recent_water_change,
    ailments,
    recent_product,
    recent_substrate_fertilizer,
    recent_water_fertilizer
  }) {
    this.id = id;
    this.volume = volume;
    this.volume_unit = volume_unit;
    this.is_cycled = is_cycled;
    this.filtration = filtration;
    this.substrate = substrate;
    this.temperature_setting = temperature_setting;
    this.temperature_unit = temperature_unit;
    this.livestock = livestock;
    this.plants = plants;
    this.light_settings = light_settings;
    this.parameters = parameters;
    this.test_schedule = test_schedule;
    this.recent_water_change = recent_water_change;
    this.ailments = ailments;
    this.recent_product = recent_product;
    this.recent_substrate_fertilizer = recent_substrate_fertilizer;
    this.recent_water_change = recent_water_fertilizer;
  }

  get volume() {
    return `${this.volume}${this.volume_unit}`;
  }
}

export default { Tank };