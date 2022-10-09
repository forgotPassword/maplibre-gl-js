import {
    Uniform1i,
    Uniform1f,
    Uniform4f,
    UniformMatrix4f,
    UniformColor,
    Uniform2f
} from '../uniform_binding';
import type Context from '../../gl/context';
import type {UniformValues, UniformLocations} from '../../render/uniform_binding';
import {mat4} from 'gl-matrix';
import Sky from '../../style/sky';
import { transform } from 'typescript';

export type TerrainPreludeUniformsType = {
    'u_depth': Uniform1i;
    'u_terrain': Uniform1i;
    'u_terrain_dim': Uniform1f;
    'u_terrain_matrix': UniformMatrix4f;
    'u_terrain_unpack': Uniform4f;
    'u_terrain_exaggeration': Uniform1f;
};

export type TerrainUniformsType = {
    'u_matrix': UniformMatrix4f;
    'u_texture': Uniform1i;
    'u_fog_matrix': UniformMatrix4f;
    'u_fog_color': UniformColor;
    'u_fog_blend': Uniform2f;
};

export type TerrainDepthUniformsType = {
    'u_matrix': UniformMatrix4f;
};

export type TerrainCoordsUniformsType = {
    'u_matrix': UniformMatrix4f;
    'u_texture': Uniform1i;
    'u_terrain_coords_id': Uniform1f;
};

const terrainPreludeUniforms = (context: Context, locations: UniformLocations): TerrainPreludeUniformsType => ({
    'u_depth': new Uniform1i(context, locations.u_depth),
    'u_terrain': new Uniform1i(context, locations.u_terrain),
    'u_terrain_dim': new Uniform1f(context, locations.u_terrain_dim),
    'u_terrain_matrix': new UniformMatrix4f(context, locations.u_terrain_matrix),
    'u_terrain_unpack': new Uniform4f(context, locations.u_terrain_unpack),
    'u_terrain_exaggeration': new Uniform1f(context, locations.u_terrain_exaggeration)
});

const terrainUniforms = (context: Context, locations: UniformLocations): TerrainUniformsType => ({
    'u_matrix': new UniformMatrix4f(context, locations.u_matrix),
    'u_texture': new Uniform1i(context, locations.u_texture),
    'u_fog_matrix': new UniformMatrix4f(context, locations.u_fog_matrix),
    'u_fog_color': new UniformColor(context, locations.u_fog_color),
    'u_fog_blend': new Uniform2f(context, locations.u_fog_blend),
});

const terrainDepthUniforms = (context: Context, locations: UniformLocations): TerrainDepthUniformsType => ({
    'u_matrix': new UniformMatrix4f(context, locations.u_matrix)
});

const terrainCoordsUniforms = (context: Context, locations: UniformLocations): TerrainCoordsUniformsType => ({
    'u_matrix': new UniformMatrix4f(context, locations.u_matrix),
    'u_texture': new Uniform1i(context, locations.u_texture),
    'u_terrain_coords_id': new Uniform1f(context, locations.u_terrain_coords_id)
});

const terrainUniformValues = (
    matrix: mat4,
    fogMatrix: mat4,
    sky: Sky,
    pitch: number
): UniformValues<TerrainUniformsType> => ({
    'u_matrix': matrix,
    'u_texture': 0,
    'u_fog_matrix': fogMatrix,
    'u_fog_color': sky.properties.get('fog-color'),
    'u_fog_blend': [sky.properties.get('fog-blend'), sky.calculateFogBlendOpacity(pitch)]
});

const terrainDepthUniformValues = (
    matrix: mat4
): UniformValues<TerrainDepthUniformsType> => ({
    'u_matrix': matrix
});

const terrainCoordsUniformValues = (
    matrix: mat4,
    coordsId: number
): UniformValues<TerrainCoordsUniformsType> => ({
    'u_matrix': matrix,
    'u_terrain_coords_id': coordsId / 255,
    'u_texture': 0
});

export {terrainUniforms, terrainDepthUniforms, terrainCoordsUniforms, terrainPreludeUniforms, terrainUniformValues, terrainDepthUniformValues, terrainCoordsUniformValues};
